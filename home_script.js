document.addEventListener("DOMContentLoaded", () => {
	const itemsPerPage = 6;
	const listContainer = document.getElementById("articles");
	const prevLine = document.getElementById("previous-line").querySelector("code");
	const nextLine = document.getElementById("next-line").querySelector("code");
	const searchInput = document.getElementById("searchInput");
	let currentPage = 1;

	// Render articles for a given page (can be filtered)
	function renderPage(page, filteredArticles = articles) {
		listContainer.innerHTML = "";

		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const pageItems = filteredArticles.slice(startIndex, endIndex);

		// Build list items dynamically
		pageItems.forEach(article => {
			const li = document.createElement("li");
			li.style.display = "flex";
			li.style.justifyContent = "space-between";
			li.style.alignItems = "center";

			const link = document.createElement("a");
			link.href = article.file;
			link.textContent = article.title;
			link.style.color = "#20b562";
			link.style.textDecoration = "none";
			li.appendChild(link);

			const spanDate = document.createElement("span");
			spanDate.textContent = article.date;
			spanDate.style.color = "#20b562";
			li.appendChild(spanDate);

			listContainer.appendChild(li);
		});

		// Previous button logic
		if (currentPage > 1) {
			prevLine.style.cursor = "pointer";
			prevLine.onclick = () => {
				currentPage--;
				renderPage(currentPage, filteredArticles);
			};
		} else {
			prevLine.style.cursor = "default";
			prevLine.onclick = null;
		}

		// Next button logic
		if (endIndex < filteredArticles.length) {
			nextLine.style.cursor = "pointer";
			nextLine.onclick = () => {
				currentPage++;
				renderPage(currentPage, filteredArticles);
			};
		} else {
			nextLine.style.cursor = "default";
			nextLine.onclick = null;
		}
	}

	// Live search: filter articles as user types
	searchInput.addEventListener("input", () => {
		const query = searchInput.value.toLowerCase().trim();
		const filteredArticles = articles.filter(article =>
			article.title.toLowerCase().includes(query)
		);
		currentPage = 1; // reset to first page
		renderPage(currentPage, filteredArticles);
	});

	// Initial render
	renderPage(currentPage);
});