let token = localStorage.getItem('token')
if (!token) {
    window.location.href="index.html"
}

var admin = new Vue({
    el: '#admin',
    data: {
        id: '',
        name: '',
        price: 0,
        stock: 0,
        image: '',
        products: []
    },

    methods: {
        addItem() {
            let formdata = new FormData()
            formdata.append('image', this.image)
            axios({
                method: 'post',
                url: `http://localhost:3000/items/upload`,
                data: formdata
            })
                .then((response) => {
                    axios({
                        method: 'post',
                        url: `http://localhost:3000/items`,
                        data: {
                            name: this.name,
                            price: this.price,
                            stock: this.stock,
                            image: response.data.link
                        }
                    })
                        .then((result) => {
                            window.location.href="http://localhost:8080/admin.html"
                        })
                        .catch((err) => {
                            swal(err.message)
                        });
                })

                .catch((err) => {
                    swal(err.message)

                });
        },

        getImage(image) {
            this.image = image.target.files[0]
        },

        getOneItem(item) {
            axios({
                method: 'get',
                url: `http://localhost:3000/items/${item._id}`
            })
                .then((response) => {
                    this.id = response.data.data._id
                    this.name = response.data.data.name
                    this.price = response.data.data.price
                    this.stock = response.data.data.stock
                })
                .catch((err) => {
                    console.log(err);

                });
        },

        updateItem() {
            let formdata = new FormData()
            formdata.append('image', this.image)
            axios({
                method: 'post',
                url: `http://localhost:3000/items/upload`,
                data: formdata
            })
                .then((response) => {
                    axios({
                        method: 'put',
                        url: `http://localhost:3000/items/${this.id}`,
                        data: {
                            name: this.name,
                            price: this.price,
                            stock: this.stock,
                            image: response.data.link
                        }
                    })
                        .then((response) => {
                            swal(response.message)
                            window.location.href="http://localhost:8080/admin.html"
                        })
                        .catch((err) => {
                            swal(err.message)

                        });
                })

                .catch((err) => {
                    swal(err.message)
                });
        },

        removeItem(item) {
            axios({
                method: 'delete',
                url: `http://localhost:3000/items/${item._id}`
            })
                .then((response) => {
                    window.location.href="http://localhost:8080/admin.html"

                })
                .catch((err) => {
                    swal(err.message)
                });

        },

        logOut() {
            localStorage.removeItem('token')
            window.location.href = "http://localhost:8080/index.html"
        }
    },
    mounted() {
        axios({
            method: 'get',
            url: `http://localhost:3000/items`
        })
            .then((response) => {
                this.products = response.data.data
            })

            .catch((err) => {
                swal(err.message)

            });
    }
})