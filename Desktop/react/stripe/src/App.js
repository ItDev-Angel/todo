import './App.css';
import {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
toast.configure();
function App() {
  const[product] = useState({
    name:"tesla model 3",
    price:45000.99,
  })
  
  function handelToken(token, addresses) {
    const {response} = await axios.post('link/checkout', {token, product})
    const {status} = response.data
    if(status === 'success') {
      toast('Success! check email for details', {type: 'success'})
    } else {
      toast('Something went wrong!', {type: 'error'})
    }
  }
  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>on Sale: ${product.price}</h3>
        <StripeCheckout 
          stripeKey="pk_test_51LQb3IEgyvcFSsDxiu4ngb93iBPy1SQTXpvrLc6FOnt35T0WZCPTUPAeEcIagHckWm1VuJq0x53YvEQ61pJJ16kZ00K7DDZMEH"
          token={handelToken}
          billingAddress
          shippingAddress
          amount={product.price * 100}
          name={product.name}
        />
      </div>
    </div>
  );
}

export default App;
