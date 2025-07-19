import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { InputGroup, Row, TagButton } from './style'
import boleto from '../../assets/images/barcode.png'
import cartao from '../../assets/images/credit-card.png'

export const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)

  return (
    <div className="container">
      <Card title="Dados de cobrança">
        <>
          <Row>
            <InputGroup>
              <label htmlFor="fullname">Nome completo</label>
              <input id="fullname" type="text" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input id="cpf" type="text" />
            </InputGroup>
          </Row>
          <h3 className="margin-top ">Dados de entrega - conteúdo digital</h3>
          <Row>
            <InputGroup>
              <label htmlFor="deliveryEmail">E-mail</label>
              <input id="deliveryEmail" type="email" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="confirmDeliveryEmail">Confirme o e-mail</label>
              <input id="confirmDeliveryEmail" type="email" />
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
                    <input id="cardOwner" type="text" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cpfCardOwner">
                      CPF do titular do cartão
                    </label>
                    <input id="cpfCardOwner" type="text" />
                  </InputGroup>
                </Row>
                <Row marginTop="24px">
                  <InputGroup>
                    <label htmlFor="cardDysplayName">Nome no cartão</label>
                    <input id="cardDysplayName" type="text" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cardNumber">Número do cartão</label>
                    <input id="cardNumber" type="text" />
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresMonth">Mês do vencimento</label>
                    <input id="expiresMonth" type="text" />
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresYear">Ano de vencimento</label>
                    <input id="expiresYear" type="text" />
                  </InputGroup>
                  <InputGroup maxWidth="48px">
                    <label htmlFor="cardCode">CVV</label>
                    <input id="cardCode" type="text" />
                  </InputGroup>
                </Row>
                <Row marginTop="24px">
                  <InputGroup maxWidth="160px">
                    <label htmlFor="installments">Parcelamento</label>
                    <select>
                      <option>1x de R$ 200,00</option>
                      <option>2x de R$ 200,00</option>
                      <option>3x de R$ 200,00</option>
                    </select>
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
    </div>
  )
}
