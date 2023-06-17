window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsfilter",
  (filterInstances) => {
    console.log("cmsfilter Successfully loaded!");

    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;

    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on("renderitems", (renderedItems) => {
      console.log(renderedItems);
    });

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
