<script lang="ts">
	import title from '$lib/stores/title';
	$: pageTitle = $title;
</script>

<svelte:head>
	<title>{pageTitle ? `${pageTitle} - Todos` : 'Todos'}</title>
</svelte:head>

<body>
	<main class="container">
		<slot />
	</main>
</body>
