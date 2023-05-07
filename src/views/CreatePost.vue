<template>
    <div class="create-post">
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p><span>Error:</span>{{ this.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input
                    type="text"
                    placeholder="Enter Blog Title"
                    v-model="blogTitle"
                />
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input
                        type="file"
                        ref="blogPhoto"
                        id="blog-photo"
                        accept=".png, .jpg, ,jpeg"
                        @change="handleFileUpload"
                    />

                    <span>File Chosen: {{ selectedFileName }}</span>
                </div>
            </div>
            <div class="selected-photo">
                <img v-if="blogPhoto" :src="blogPhoto" />
            </div>
            <div class="editor">
                <vue-editor
                    :editorOptions="editorSettings"
                    v-model="blogHTML"
                    useCustomImageHandler
                />
            </div>
            <div class="blog-actions">
                <button @click="saveBlog">Publish Blog</button>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from 'quill'
window.Quill = Quill
import { mapMutations } from 'vuex'

const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)

export default {
    name: 'CreatePost',
    data() {
        return {
            blogTitle: '', // state cho input blogTitle
            blogPhoto: null, // state cho input blogPhoto
            blogHTML: '', // state cho editor blogHTML
            editorSettings: {
                // các cài đặt cho Vue Editor
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['link', 'image', 'video'],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ size: [] }],
                        ['clean'],
                    ],
                    imageResize: {},
                },
                theme: 'snow',
            },
            error: false, // state để xử lý lỗi
            errorMsg: '', // state để hiển thị thông báo lỗi
        }
    },
    methods: {
        // Hàm xử lý sự kiện khi người dùng chọn ảnh
        handleFileUpload(event) {
            // Kiểm tra xem có tệp nào được chọn không
            if (event.target.files.length > 0) {
                // Lưu ảnh được chọn vào state blogPhoto
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload = () => {
                    this.blogPhoto = reader.result
                }
                reader.readAsDataURL(file)
            }
        },

        saveBlog() {
            // các trường dữ liệu và ảnh đã được nhập đầy đủ, cho phép lưu bài đăng
            console.log('Blog Title:', this.blogTitle)
            console.log('Blog HTML:', this.blogHTML)
            console.log('Blog Photo:', this.blogPhoto)

            // Thêm blog mới vào trong state
            const blogCard = {
                blogTitle: this.blogTitle,
                blogCoverPhoto: this.blogPhoto,
                blogDate: 'May 3, 2021',
            }
            this.addBlogCard(blogCard)
        },
        ...mapMutations(['addBlogCard']),
    },
    computed: {
        selectedFileName() {
            if (this.blogPhoto) {
                return this.blogPhoto.name
            } else {
                return ''
            }
        },
    },
}
</script>
