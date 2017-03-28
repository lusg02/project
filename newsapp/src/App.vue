<template>
    <div id="app">
        <loading v-show="loading"></loading>
        <NavView v-show="headerShow"></NavView>
        <!-- <HomeView></HomeView> -->
        <transition name="slide-down">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

        <FooterView v-show="footerShow"></FooterView>
    </div>
</template>

<script>

	import NavView from './components/Nav.vue';
	import FooterView from './components/Footer.vue';
	import Home from './components/Home.vue';

	import {
		mapGetters,
		mapActions
	} from 'vuex';

	export default {
		computed: mapGetters([
			'headerShow',
			'loading',
            'footerShow'
		]),
		mounted() {
		  let path = this.$route.path.substring(1);
          this.headerChange(path);
          this.footerChange(path);
        },
		watch: {
			$route(to, from) {
				let path = to.path.substring(1);
				console.log(path);
				this.headerChange(path);
				this.footerChange(path);
			}
		},
		methods: {
		  headerChange(path) {
		    if (path === 'user-info' || path === 'user-reg' || path === 'user-login' || path.indexOf('article') !== -1) {
		      this.$store.dispatch('hideHeader');
            } else {
		      this.$store.dispatch('showHeader');
            }
          },
          footerChange(path) {
		    if (path.indexOf('article') === -1) {
		      this.$store.dispatch('showFooter');
            } else {
		      this.$store.dispatch('hideFooter');
            }
          }
        },
		components: {
			NavView: NavView,
			FooterView: FooterView
		}
	}
</script>

<style lang="css">
    @import './assets/css/index.css';
    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: .4s all ease;
        opacity: .2;
        transform: translate3d(0, 5em, 0);
    }
    .slide-down-enter,
    .slide-down-leave {
        opacity: 1;
        transform: translate3d(0, 5em, 0);
    }
</style>
