<script lang="ts">
	import title from '$lib/stores/title';
	title.set('Register');
</script>

<div class="login-component">
	<h1>Register</h1>
	<br />

	<form>
		<fieldset>
			<input name="username" placeholder="Username" required />
			<br />
			<input name="password" placeholder="Password" type="password" required />
		</fieldset>
		<button type="button">Register</button>
	</form>
</div>

<style>
	.login-component {
		text-align: center;
	}
    button {
        width: 75vw;
        max-width: 250px;
    }
	input {
		width: 75vw;
		max-width: 700px;
	}
</style>
