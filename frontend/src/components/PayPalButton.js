import { useDispatch } from 'react-redux';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { payOrder } from '../store/order-slice';

const style = { layout: 'vertical' };

const PayPalButton = ({ totalPrice, orderId }) => {
  const dispatch = useDispatch();

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder({ orderId, paymentResult }));
  };

  return (
    <PayPalButtons
      style={style}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice,
              },
            },
          ],
        });
      }}
      onApprove={async function (data, actions) {
        const paymentInfo = await actions.order.capture();
        console.log('Payment info', paymentInfo);

        successPaymentHandler(paymentInfo);
      }}
      onError={err => {
        console.error('PayPal Checkout onError', err);
      }}
    />
  );
};

export default PayPalButton;
