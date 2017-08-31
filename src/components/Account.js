import React from 'react'
import {NavLink} from 'react-router-dom'
import auth from '../auth'

class Account extends React.Component{
  constructor(props){
    super(props)
    this.state = {products: [], orders: []}
  }

componentDidMount(){
  auth.getOrders()
    .then((orders)=>{
      console.log(orders)
      this.setState({orders: orders.data})
    })
  // this.request({method: 'GET', url: '/products'})
  // .then((prod)=>{
  //   console.log("?");
  //
  //   console.log(prod.data);
  //   this.setState({products: prod.data})
  //   console.log(this.state);
  // })


  // auth.getUserOrders().then(response => {
  // // console.log(response)
  // // set the state to contain the orders you get back from server.
  // })
}

handleEditSubmit(id,evt){
  evt.preventDefault()
  const formData = {
    name: this.refs.name.value,
    email: this.refs.email.value
  }
  console.log("CREATING ACCOUNT...");
  console.log(formData);
  auth.editUser(formData,id).then((err)=>{
    this.props.parent.setCurrentUser()
  })
}
handleDeleteSubmit(id, evt){
  evt.preventDefault()
  console.log('deleting account')
  auth.deleteUser(id)
  .then((err) => {
    this.props.parent.setCurrentUser()
    this.setState({shouldRedirect: true})
  })
}

  render(){
    return (
      <div>
      <div className="User-Info">
          <h1>Edit User Info🙋🏻</h1>
          <p>Name: {this.props.currentUser.name}</p>
          <br/>
          <p>Email: {this.props.currentUser.email}</p>
          <h2>{this.props.currentUser.password}</h2>
          {console.log(this.props.currentUser)}
      </div>
          <form onSubmit={this.handleEditSubmit.bind(this, this.props.currentUser._id)}>
            Update name: <input className="form" ref='name' type="text" defaultValue={this.props.currentUser.name} />
            <br />
            Update email: <input className="form" ref='email' type="text" defaultValue={this.props.currentUser.email} />
            <button>Update</button>
        </form>
        <button onClick ={this.handleDeleteSubmit.bind(this, this.props.currentUser._id)}>Delete Account</button>
        <div className="OrderHistory">
          <h1>Order History🙋🏻</h1>
            {this.state.orders.map((o) => (
              <ul id='order' key={o._id}>
                Created At: {o.createdAt} <br/>
                Quantity:   {o.products.length}
                  {o.products.map((p)=>
                    (
                      <li>
                        <p>Name: {p.name} </p> <br/>
                        <p>Price: ${p.price}</p>
                      </li>
                    ))}
              </ul>

              ))
            }
        </div>
      </div>
      )
  }
}

export default Account
