var token = localStorage.getItem('token')

var app = new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        cek_login: token,
        stock: 0,
        items: [],
        cart: [],
        temp: [],
        jumlah: 0,
        total_price: 0,
        quantity: 0,
        transaction: []
    },
    methods: {
        buyItem(item) {
            if (!token) {
                swal('Please Login First')
                setInterval(function(){
                    window.location.href = "http://localhost:8080/login.html"
                },2000)
            }else {
                this.temp.push(item)
            }
            
        },

        cancelBuy() {
            this.temp = []
        },

        addToCart(item) {
            if (item.stock == 0) {
                item.stock = 0
                this.temp = []
                this.quantity = 0
                return swal('Maaf Stock Abis')
            }

            if (this.quantity > item.stock) {
                this.temp = []
                return swal('Maaf Melebihi Stock yang Ada!')
            }

            let obj = {
                id: item.id,
                name: item.name,
                type: item.type,
                price: item.price,
                img: item.img,
                quantity: this.quantity
            }

            this.jumlah += +this.quantity
            item.stock -= this.quantity
            this.total_price += (item.price*this.quantity)
            this.cart.push(obj)
            this.temp.splice(0, 1)
            this.quantity = 0
        },

        priceString(data) {
            return `Rp. ${data.toLocaleString()},-`
        },

        deleteFromCart(price, index, quantity) {
            let status = confirm('Are you sure you want to delete this item?')
            if (status) {
                this.total_price -= (price*quantity)
                this.jumlah -= quantity
                this.cart.splice(index, 1)
                this
            }
        },

        pay() {
            if (this.cart.length == 0) {
               return swal("Please choose the item")
            }
            axios({
                method: 'post',
                url: `http://localhost:3000/carts`,
                headers: {
                    token
                },
                data: {
                    item: this.cart,
                    total_price: this.total_price
                }
            })
                .then((response) => {
                    swal("Payment Success!", `Total Payment: Rp. ${this.total_price.toLocaleString()},- \n Please check your email to see the invoice. Thanks for shopping :)`, "success");
                    this.total_price = 0
                    this.jumlah = 0
                    this.cart.splice(0, this.cart.length)
                })
                .catch((err) => {
                    alert(err.message)
                });

        },
        loginUser(){
            event.preventDefault()
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/signin',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    if (response.data.role == 'admin') {
                        window.location.href="admin.html"
                        swal('login sukses', 'press the button', 'success')
                    }else {
                        window.location.href="index.html"
                        swal('login sukses', 'press the button', 'success')
                    }
                })

                .catch((err) => {
                    swal(err.message)
                    
                });
        },

        logOut(){
            localStorage.removeItem('token')
            window.location.href = "index.html"
        }
    },
    mounted(){
        axios({
            method: 'get',
            url: `http://localhost:3000/items`
        })
            .then((response) => {
                this.items = response.data.data
                
            })

            .catch((err) => {
                swal(err.message)
            });
    }
})