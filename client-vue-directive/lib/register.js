var register = new Vue({
    el: '#register',
    data: {
        name: '',
        email: '',
        password: ''

    },
    methods: {
        registerUser(){
            event.preventDefault()
            axios({
                method: 'post',
                url: `http://localhost:3000/users/signup`,
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
                .then((result) => {
                    swal(result.data.message)
                    window.location.href="http://localhost:8080/login.html"
                })
                .catch((err) => {
                    swal(err.message)
                })
        }
    }
})