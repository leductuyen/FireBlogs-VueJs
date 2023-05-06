<template>
    <div class="reset-password">
        <Modal v-if="modalActive" v-on:close-modal="closeModal" />

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

import 'firebase/auth'
export default {
    name: 'ForgotPassword',
    components: {
        email,
        Modal,
    },
    data() {
        return {
            email: null,
            modalActive: true,
            modalMessage: '',
        }
    },
    methods: {
        closeModal() {
            this.modalActive = !this.modalActive
            this.email = ''
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
