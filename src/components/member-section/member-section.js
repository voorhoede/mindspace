define([/* dependencies */],
/**
 * member-section component
 */
function(/* dependencies */){
	'use strict';

	(function () {
		var loadMoreContainer = document.querySelector('[data-content-loader]');
		var loadMoreList = loadMoreContainer.querySelector('[data-content-loader-list]');
		var loadMoreHandle = loadMoreContainer.querySelector('[data-content-loader-handle]');
		var loadMoreItems = loadMoreList.children;

		loadMoreContainer.classList.add('is-sectionable');

		/**
		 * Add is-visible class to a range of array children
		 * @param elements
		 * @param range
		 */
		function getElementSection (elements, range) {
			var elementArray = getArrayOfElements(elements);
			var selectedRange = elementArray.slice(0,range);
			var changedElements = [];

			selectedRange.forEach(function (element) {
				element.classList.add('is-visible');
				changedElements.push(element);
			});

			return changedElements;
		}

		/**
		 * Turn obj into array
		 * @param elements
		 * @returns {*}
		 */
		function getArrayOfElements(elements){
			var elementType = typeof elements;

			if(elementType !== 'array'){
				elements = Array.prototype.slice.call(elements);
			}

			return elements;
		}


		getElementSection(loadMoreItems, 8);

		loadMoreHandle.addEventListener('click', function (event) {
			var invisibleElements = [];
			var children = getArrayOfElements(loadMoreItems);
			children.forEach(function(element) {

				var elementDisplay = window.getComputedStyle(element, null).getPropertyValue('display');

				if (elementDisplay === 'none'){
					invisibleElements.push(element);
				}

			});

			if(invisibleElements.length > 0) {
				getElementSection(invisibleElements, 8);
			} else {
				loadMoreHandle.classList.add('hidden');
			}
		}, false);


	})();

});