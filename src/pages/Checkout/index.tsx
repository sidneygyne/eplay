import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { usePurchaseMutation } from '../../services/api'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'

import barCode from '../../assets/images/barcode.png'
import creditCard from '../../assets/images/credit-card.png'

import { InputGroup, Row, TagButton } from './style'

import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'
import { getTotalPrice, parseToBrl } from '../../utils'
import ReactInputMask from 'react-input-mask'

type Installments = {
  quantity: number
  amount: number
  formattedAmount: string
}

export const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installments[]>([])
  const totalPrices = getTotalPrice(items)
  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },

    validationSchema: (ctx: { payWithCard: boolean }) =>
      Yup.object({
        fullname: Yup.string()
          .min(5, 'O nome precisa ter pelo menos 5 caracteres')
          .required('O campo é obrigatório!'),

        email: Yup.string()
          .email('E-mail inválido!')
          .required('O campo é obrigatório!'),

        cpf: Yup.string()
          .matches(
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            'CPF inválido! (Formato: 000.000.000-00)'
          )
          .required('O campo é obrigatório!'),

        deliveryEmail: Yup.string()
          .email('E-mail inválido!')
          .required('O campo é obrigatório!'),

        confirmDeliveryEmail: Yup.string()
          .oneOf(
            [Yup.ref('deliveryEmail'), undefined],
            'Os e-mails não coincidem!'
          )
          .required('O campo é obrigatório!'),

        cardOwner: Yup.string().when([], {
          is: () => ctx.payWithCard,
          then: (schema) => schema.required('O campo é obrigatório'),
          otherwise: (schema) => schema
        }),

        cpfCardOwner: Yup.string()
          .matches(
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            'CPF inválido! (Formato: 000.000.000-00)'
          )
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        cardDisplayName: Yup.string()
          .min(3, 'Nome no cartão muito curto')
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        cardNumber: Yup.string()
          .transform((value) => value.replace(/\s/g, '')) // remove espaços antes de validar
          .matches(
            /^\d{16}$/,
            'Número de cartão inválido (16 dígitos, apenas números)'
          )
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        expiresMonth: Yup.string()
          .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido (de 01 a 12)')
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        expiresYear: Yup.string()
          .matches(/^\d{4}$/, 'Ano inválido (formato YYYY)')
          .test('is-future', '', (value) => {
            const currentYear = new Date().getFullYear()
            return value ? parseInt(value) >= currentYear : false
          })
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        cardCode: Yup.string()
          .matches(/^\d{3}$/, 'CVV inválido (3 dígitos)')
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          ),

        installments: Yup.number()
          .min(1, 'Selecione ao menos 1 parcela')
          .max(6, 'Número máximo de parcelas é 6')
          .when((values, schema) =>
            payWithCard ? schema.required('O campo é obrigatório') : schema
          )
      }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullname
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvlaid = fieldName in form.errors
    const hasError = isTouched && isInvlaid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installments[] = []

      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrices / i,
          formattedAmount: parseToBrl(totalPrices / i)
        })
      }
      return installmentsArray
    }

    if (totalPrices > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrices])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
              Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de credito' : 'Boleto Bancário'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja.
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de cobrança">
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="fullname">Nome completo</label>
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    value={form.values.fullname}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('fullname') ? 'error' : ''}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('email') ? 'error' : ''}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <ReactInputMask
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                  />
                </InputGroup>
              </Row>
              <h3 className="margin-top ">
                Dados de entrega - conteúdo digital
              </h3>
              <Row>
                <InputGroup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    id="deliveryEmail"
                    type="email"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      checkInputHasError('deliveryEmail') ? 'error' : ''
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="confirmDeliveryEmail">
                    Confirme o e-mail
                  </label>
                  <input
                    id="confirmDeliveryEmail"
                    type="email"
                    name="confirmDeliveryEmail"
                    value={form.values.confirmDeliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      checkInputHasError('confirmDeliveryEmail') ? 'error' : ''
                    }
                  />
                </InputGroup>
              </Row>
            </>
          </Card>
          <Card title="Pagamento">
            <>
              <TagButton
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
                type="button"
              >
                <img src={barCode} alt="Boleto" />
                Boleto bancário
              </TagButton>
              <TagButton
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
                type="button"
              >
                <img src={creditCard} alt="Cartão de credito" />
                Cartão de credito
              </TagButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <Row>
                      <InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          id="cardOwner"
                          type="text"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardOwner') ? 'error' : ''
                          }
                        />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cpfCardOwner">
                          CPF do titular do cartão
                        </label>
                        <ReactInputMask
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cpfCardOwner') ? 'error' : ''
                          }
                          mask="999.999.999-99"
                        />
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          id="cardDisplayName"
                          type="text"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <ReactInputMask
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardNumber') ? 'error' : ''
                          }
                          mask="9999 9999 9999 9999"
                        />
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês de expiração</label>
                        <ReactInputMask
                          id="expiresMonth"
                          type="text"
                          name="expiresMonth"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresMonth') ? 'error' : ''
                          }
                          mask="99"
                        />
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <ReactInputMask
                          id="expiresYear"
                          type="text"
                          name="expiresYear"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresYear') ? 'error' : ''
                          }
                          mask="9999"
                        />
                      </InputGroup>
                      <InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <ReactInputMask
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardCode') ? 'error' : ''
                          }
                          mask="999"
                        />
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup maxWidth="200px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('installments') ? 'error' : ''
                          }
                        >
                          {installments.map((installments) => (
                            <option
                              value={installments.quantity}
                              key={installments.quantity}
                            >
                              {installments.quantity}x de R${' '}
                              {installments.formattedAmount}
                            </option>
                          ))}
                        </select>
                      </InputGroup>
                    </Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do código de ativação do jogo
                    adquirido ocorrerá somente após a aprovação do pagamento do
                    boleto.
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button
            onClick={form.handleSubmit}
            type="submit"
            title="Clique aqui para finalizar compra"
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}
