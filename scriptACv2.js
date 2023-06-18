window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsfilter",
  (filterInstances) => {
    
    const categories = document.querySelectorAll(
      '[wb-autocomplete="category"]'
    );

    const categorySet = new Set();
    categories.forEach((category) => {
      categorySet.add(category.textContent);
    });

    const uniqueCategoriesArray = [...categorySet];

    const autoCompleteJS = new autoComplete({
      selector: "#autoComplete",
      data: {
        src: uniqueCategoriesArray
      },
      name: "auto-complete",
      threshold: 1,
      debounce: 300,
      searchEngine: "strict",
      resultItem: {
        highlight: true
      },
      maxResults: 5,
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection;
            const simulatedEvent = new Event("input", { bubbles: true });
            autoCompleteJS.input.dispatchEvent(simulatedEvent);
          }
        }
      }
    });

    autoCompleteJS.start();
  }
]);
