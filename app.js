document.addEventListener('DOMContentLoaded', function() {
  const defaultTab = 'suppen'; // Change this to the ID of your default tab
  const tabsBox = document.querySelector(".tabs-box");
  const allTabs = tabsBox.querySelectorAll(".tab");
  const arrowIcons = document.querySelectorAll(".icon i");

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  }

  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
      let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
      handleIcons(scrollWidth);
    });
  });

  // Event listener for tabs
  allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const activeTab = tabsBox.querySelector(".active");
      if (activeTab) {
        activeTab.classList.remove("active");
      }
      tab.classList.add("active");
    });
  });

  const startDragging = (e) => {
    isDragging = true;
    startX = e.type === "touchstart" ? e.touches[0].pageX : e.clientX;
    scrollLeft = tabsBox.scrollLeft;
  }

  const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type === "touchmove" ? e.touches[0].pageX : e.clientX;
    const walk = (x - startX) * 2; // Adjust this multiplier for sensitivity
    tabsBox.scrollLeft = scrollLeft - walk;
    handleIcons(tabsBox.scrollLeft);
  }

  const stopDragging = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
  }

  tabsBox.addEventListener("mousedown", startDragging);
  tabsBox.addEventListener("touchstart", startDragging);
  tabsBox.addEventListener("mousemove", dragging);
  tabsBox.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchend", stopDragging);

 

  function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
	
	// Get the 'tab' parameter from the URL
	const tabParam = getUrlParameter('tab');

  // Activate default tab if no tab parameter is present
  if (tabParam === '') {
    showCategory(defaultTab);
  } else {
    showCategory(tabParam);
  }
});

 // script.js
function showCategory(categoryId) {
    const allTabs = document.querySelectorAll('.tab');
    const allItems = document.querySelectorAll('.items');

    // Hide all items
    allItems.forEach(item => {
      item.style.display = 'none';
    });

    // Remove 'active' class from all tabs
    allTabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Show the selected category and mark its tab as active
    const selectedTab = document.querySelector(`[onclick="showCategory('${categoryId}')"]`);
    const selectedCategory = document.getElementById(categoryId);

    selectedTab.classList.add('active');
    selectedCategory.style.display = 'block';
  }
