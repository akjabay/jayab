<template>
    <div @keypress="onKeyPresses">
        <vue-editor
            class="editor"
            ref="editor"
            v-model="content"
            :editorToolbar="customToolbar"
            :editorOptions="editorOptions"
            @blur="onEditorBlur"
        ></vue-editor>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { encode, decode } from 'js-base64'
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";


export default {
    name: "TextEditor",
    props: {
        fetchedContent: String
    },
    components: {
        VueEditor,
    },

    data() {
        return {
            content: "",
            customToolbar: [
                [{ font: [] }, { size: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "super" }, { script: "sub" }],
                [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                [{ direction: "rtl" }, { align: [] }],
                ["link"],
                ["clean"],
            ],
            editorOptions: {
                placeholder: "Type something in here!",
            },
        };
    },

    methods: {
        onEditorBlur(quill) {
            this.$emit('on-update', encode(JSON.stringify(quill.editor.delta)))
        },

        onKeyPresses () {
            this.onEditorBlur(this.$refs.editor.quill)
            
        },

        decodeAndSetContent () {
            const decoded = this.fetchedContent ? decode(this.fetchedContent): '[]';
            const deltaOps = JSON.parse(decoded);
            const converter = new QuillDeltaToHtmlConverter(deltaOps.ops, {});
            const html = converter.convert();
            this.content = html;
        }
    },

    mounted () {
        this.decodeAndSetContent();
    }
};
</script>

<style>
.editor {
  direction: ltr;
}
</style>