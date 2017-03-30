<template>
	<div id="follow">
		<div class="content  mt30">
			<div class="newsList">
				<ul>
					<li v-for="(item, index) in arrList">
						<a href="javascript:">
							<h2>{{ item.title }}</h2>
							<p v-html="item.content"></p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				arrList: []
						}
				},
		mounted () {
			this.fetchData();
				},
		methods: {
			fetchData () {
				let _this = this;
				this.$http.get('src/data/article.data').then(function (res) {
						_this.arrList = res.data;
				}).catch(function (err) {
						console.log('Home', err);
				});
			}
		}
	}
</script>
<style scoped>
	.mt30 {
		margin-top: 30px;
	}
</style>
