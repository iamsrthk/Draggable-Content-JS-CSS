// script.js
let draggableCount = 0 // To keep track of how many draggables we have

const addButton = document.getElementById("addButton")
const removeButton = document.getElementById("removeButton")
const container = document.getElementById("draggableContainer")
const dropzone = document.querySelector(".dropzone")

// Function to create a new draggable element
function createDraggable() {
	const draggable = document.createElement("div")
	draggable.classList.add("draggable")
	draggable.id = `draggable-${++draggableCount}`
	draggable.textContent = "Drag me!"
	container.appendChild(draggable)

	// Add drag and drop functionality to the new draggable element
	enableDrag(draggable)
}

// Function to enable drag functionality
function enableDrag(draggable) {
	let offsetX, offsetY

	draggable.addEventListener("mousedown", (e) => {
		offsetX = e.clientX - draggable.getBoundingClientRect().left
		offsetY = e.clientY - draggable.getBoundingClientRect().top

		// Set up mouse move and mouse up event listeners
		document.addEventListener("mousemove", mouseMoveHandler)
		document.addEventListener("mouseup", mouseUpHandler)
	})

	function mouseMoveHandler(e) {
		// Move the draggable element
		draggable.style.position = "absolute"
		draggable.style.left = `${e.clientX - offsetX}px`
		draggable.style.top = `${e.clientY - offsetY}px`
	}

	function mouseUpHandler() {
		document.removeEventListener("mousemove", mouseMoveHandler)
		document.removeEventListener("mouseup", mouseUpHandler)

		const dropzoneRect = dropzone.getBoundingClientRect()
		const draggableRect = draggable.getBoundingClientRect()

		if (
			draggableRect.left < dropzoneRect.right &&
			draggableRect.right > dropzoneRect.left &&
			draggableRect.top < dropzoneRect.bottom &&
			draggableRect.bottom > dropzoneRect.top
		) {
			// If it is dropped in the dropzone, position it inside
			draggable.style.left = `${
				dropzoneRect.left + (dropzoneRect.width - draggableRect.width) / 2
			}px`
			draggable.style.top = `${
				dropzoneRect.top + (dropzoneRect.height - draggableRect.height) / 2
			}px`
		}
	}
}

// Add event listener for adding a draggable item
addButton.addEventListener("click", () => {
	createDraggable()
})

// Add event listener for removing the last draggable item
removeButton.addEventListener("click", () => {
	if (draggableCount > 0) {
		const lastDraggable = document.getElementById(`draggable-${draggableCount}`)
		if (lastDraggable) {
			container.removeChild(lastDraggable)
			draggableCount--
		}
	}
})

// Initial draggable
createDraggable()
