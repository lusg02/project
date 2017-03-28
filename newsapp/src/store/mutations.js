import getters from './getters';

const state = {
	show: true,
	loading: false,
	footerShow: true
};

const mutations = {
	showHeader(state) {
		state.show = true;
	},
	hideHeader(state) {
		state.show = false;
	},
	showLoading(state) {
		state.loading = true;
	},
	hideLoading(state) {
		state.loading = false;
	},
	showFooter(state) {
		state.footerShow = true;
	},
	hideFooter(state) {
		state.footerShow = false;
	}
};

export default {
	state,
	mutations,
	getters
}