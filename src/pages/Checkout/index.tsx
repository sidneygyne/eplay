import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { InputGroup, Row, TagButton } from './style'
import boleto from '../../assets/images/barcode.png'
import cartao from '../../assets/images/credit-card.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)

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

    validationSchema: Yup.object({
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

      cardOwner: Yup.string()
        .min(5, 'Nome muito curto')
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatório') : schema
        ),

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
        .max(12, 'Número máximo de parcelas é 12')
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatório') : schema
        )
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const getErroMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvlaid = fieldName in form.errors

    if (isTouched && isInvlaid) return message
    return ''
  }

  return (
    <form onSubmit={form.handleSubmit} className="container">
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
              />
              <small>{getErroMessage('fullname', form.errors.fullname)}</small>
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
              />
              <small>{getErroMessage('email', form.errors.email)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={form.values.cpf}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErroMessage('cpf', form.errors.cpf)}</small>
            </InputGroup>
          </Row>
          <h3 className="margin-top ">Dados de entrega - conteúdo digital</h3>
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
              />
              <small>
                {getErroMessage('deliveryEmail', form.errors.deliveryEmail)}
              </small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="confirmDeliveryEmail">Confirme o e-mail</label>
              <input
                id="confirmDeliveryEmail"
                type="email"
                name="confirmDeliveryEmail"
                value={form.values.confirmDeliveryEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErroMessage(
                  'confirmDeliveryEmail',
                  form.errors.confirmDeliveryEmail
                )}
              </small>
            </InputGroup>
          </Row>
        </>
      </Card>
      <Card title="Pagamento">
        <>
          <TagButton
            isActive={!payWithCard}
            onClick={() => setPayWithCard(false)}
          >
            <img src={boleto} alt="Boleto" />
            Boleto bancário
          </TagButton>
          <TagButton
            isActive={payWithCard}
            onClick={() => setPayWithCard(true)}
          >
            <img src={cartao} alt="Cartão de credito" />
            Cartão de credito
          </TagButton>
          <div className="margin-top">
            {payWithCard ? (
              <>
                <Row>
                  <InputGroup>
                    <label htmlFor="cardOwner">Nome do titular do cartão</label>
                    <input
                      id="cardOwner"
                      type="text"
                      name="cardOwner"
                      value={form.values.cardOwner}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('cardOwner', form.errors.cardOwner)}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cpfCardOwner">
                      CPF do titular do cartão
                    </label>
                    <input
                      id="cpfCardOwner"
                      type="text"
                      name="cpfCardOwner"
                      value={form.values.cpfCardOwner}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('cpfCardOwner', form.errors.cpfCardOwner)}
                    </small>
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
                    />
                    <small>
                      {getErroMessage(
                        'cardDisplayName',
                        form.errors.cardDisplayName
                      )}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cardNumber">Número do cartão</label>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      value={form.values.cardNumber}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('cardNumber', form.errors.cardNumber)}
                    </small>
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresMonth">Mês do vencimento</label>
                    <input
                      id="expiresMonth"
                      type="text"
                      name="expiresMonth"
                      value={form.values.expiresMonth}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('expiresMonth', form.errors.expiresMonth)}
                    </small>
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresYear">Ano de vencimento</label>
                    <input
                      id="expiresYear"
                      type="text"
                      name="expiresYear"
                      value={form.values.expiresYear}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('expiresYear', form.errors.expiresYear)}
                    </small>
                  </InputGroup>
                  <InputGroup maxWidth="48px">
                    <label htmlFor="cardCode">CVV</label>
                    <input
                      id="cardCode"
                      type="text"
                      name="cardCode"
                      value={form.values.cardCode}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErroMessage('cardCode', form.errors.cardCode)}
                    </small>
                  </InputGroup>
                </Row>
                <Row marginTop="24px">
                  <InputGroup maxWidth="160px">
                    <label htmlFor="installments">Parcelamento</label>
                    <select
                      id="installments"
                      value={form.values.installments}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      <option>1x de R$ 200,00</option>
                      <option>2x de R$ 200,00</option>
                      <option>3x de R$ 200,00</option>
                    </select>
                    <small>
                      {getErroMessage('installments', form.errors.installments)}
                    </small>
                  </InputGroup>
                </Row>
              </>
            ) : (
              <p>
                Ao optar por essa forma de pagamento, é importante lembrar que a
                confirmação pode levar até 3 dias úteis, devido aos prazos
                estabelecidos pelas instituições financeiras. Portanto, a
                liberação do código de ativação do jogo adquirido ocorrerá
                somente após a aprovação do pagamento do boleto.
              </p>
            )}
          </div>
        </>
      </Card>
      <Button type="button" title="Clique aqui para finalizar compra">
        Finalizar compra
      </Button>
    </form>
  )
}
