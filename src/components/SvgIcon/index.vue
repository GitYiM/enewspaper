<template>
<div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
<svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners" :style="{'font-size':size+'rem'}">
  <use :xlink:href="iconName" />
</svg>
</template>

<script>

export default {
    name: 'SvgIcon',
    props: {
      iconClass: {

        required: true, 
      },
      className: {
        type: String,
        default: '',
      },
      size:{
        type:String,
        default:'0.8'  //我这边使用的是rem字体布局
      }
    },
    computed: {
      isExternal() {
        return /^(https?:|mailto:|tel:)/.test(this.iconClass);
      },
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return `svg-icon ${this.className}`;
        }
        return 'svg-icon';
      },
      styleExternalIcon() {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
        };
      },
    },
  };
</script>

<style scoped>
  .svg-icon {
   width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover!important;
    display: inline-block;
  }
</style>