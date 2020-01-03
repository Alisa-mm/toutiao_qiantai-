<template>
 <input type="text" class="hminput" :class="{'success':statu,'error':!statu}" @input="handleInput" @blur="handleBlur">
</template>

<script>
export default {
    props:['rules','msg'],
data () {
    return {
        // 标记用户的输入是否合法
        statu:true
    }
},
methods:{
    // 用户输入的时候，监听用户的的输入，并且使用正则表达式进行用户输入数据的验证
    // 成功的话就添加成功的样式  失败添加失败的样式
    handleInput(event){
       let value = event.target.value
       if(this.rules && this.rules.test(value)){
           this.statu = true
       }else{
           this.statu = false
       }
        // 告诉父组件输入框的内容变化了
        this.$emit('input',value)
    },
    handleBlur(){
        let value = event.target.value
        if(this.rules && this.rules.test(value)){
            console.log(this.msg || '输入不正确');
            
        }
    }
}
}
</script>

<style lang="less" scoped>
 .hminput{
        width:318/360*100vw;
        height: 60px;
        outline:none;
        border:none;
        border-bottom: 3px solid #ccc;
        font-size: 20px;
        line-height: 60px;
        margin-bottom: 20px;
    }
    .success{
        border-bottom-color:green;
    }
    .error{
        border-bottom-color:red;
    }
</style>