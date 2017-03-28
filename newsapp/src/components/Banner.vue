<template>
	<div class="banner">
		<ul class="clearfix">
			<li>
				<img src="../assets/images/img_1.jpg" alt="">
				<div class="text-box">
					<h2>经过了漫长的等候，梦想是梦想，我还是一个我</h2>
					<p>刘高兴 / 文</p>
				</div>
			</li>
			<li>
				<img src="../assets/images/img_2.jpg" alt="">
				<div class="text-box">
					<h2>经过了漫长的等候，梦想是梦想，我还是一个我</h2>
					<p>刘高兴 / 文</p>
				</div>
			</li>
			<li>
				<img src="../assets/images/img_3.jpg" alt="">
				<div class="text-box">
					<h2>经过了漫长的等候，梦想是梦想，我还是一个我</h2>
					<p>刘高兴 / 文</p>
				</div>
			</li>
		</ul>
		<ol>
			<li class="active"></li>
			<li></li>
			<li></li>
		</ol>
	</div>
</template>
<script>
	export default {
		mounted () {
			this.slider();
		},
		methods: {
			slider () {
				$(function () {
					var mySwipe = Swipe($('.banner')[0], {
						auto:　2000,
						continuous: true,
						stopPropation: true,
						callback: function (idx, ele) {
							$('.banner ol li').removeClass('active');
							$('.banner ol li').eq(idx).addClass('active');
						}
					});
				})
			}
		}
	}
</script>
