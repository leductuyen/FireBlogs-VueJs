<template>
    <div class="reset-password">
        <Modal
            v-if="modalActive"
            :modalMessage="modalMessage"
            v-on:close-modal="closeModal"
        />
        <Loading v-if="loading" />
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }"
                        >Login</router-link
                    >
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your passowrd? Enter your email to reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <email class="icon" />
                    </div>
                </div>
                <button @click.prevent="resetPassword">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg'
import Modal from '../components/Modal'
import Loading from '../components/Loading.vue'
import 'firebase/auth'
import firebase from 'firebase'
export default {
    name: 'ForgotPassword',
    components: {
        email,
        Modal,
        Loading,
    },
    data() {
        return {
            email: '',
            modalActive: false,
            modalMessage: '',
            loading: null,
        }
    },
    methods: {
        closeModal() {
            this.modalActive = !this.modalActive
            this.email = ''
        },
        resetPassword() {
            this.loading = true
            firebase
                .auth()
                .sendPasswordResetEmail(this.email)
                .then(() => {
                    this.modalMessage =
                        'If your account exists, you will receive email'
                    this.loading = false
                    this.modalActive = true
                })
                .catch((err) => {
                    console.log(err)
                    this.modalMessage = err.message
                    this.loading = false
                    this.modalActive = true
                })
        },
    },
}
</script>

<style scoped>
.reset-password {
    position: relative;
}
.reset-password .form-wrap .reset h2 {
    margin-bottom: 8px;
}
.reset-password .form-wrap .reset p {
    text-align: center;
    margin-bottom: 32px;
}
</style>
