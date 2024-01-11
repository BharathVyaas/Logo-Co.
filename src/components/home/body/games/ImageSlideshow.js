import { useState } from "react";

import ListRenderer from "../../../../ui/ListRenderer";

import "../../../../App.css";

/**
 * ImageSlideshow component for displaying a slideshow of game images.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.images - Array of image URLs.
 * @param {Object} props.color - Object containing color-related CSS classes.
 * @returns {JSX.Element} - The rendered ImageSlideshow component.
 */
const ImageSlideshow = (props) => {
  // Reference to the image track element
  const imageTrackElement = document.getElementById("image_track");

  // State to track whether the mouse button is pressed
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Handle mouse down event
  window.onmousedown = (event) => {
    if (imageTrackElement) {
      imageTrackElement.dataset.mouseDownAt = event.clientX;
    }
    setIsMouseDown(true);
  };

  // Handle mouse up event
  window.onmouseup = () => {
    if (imageTrackElement) {
      imageTrackElement.dataset.mouseDownAt = "0";
      imageTrackElement.dataset.prevPercentage =
        imageTrackElement.dataset.percentage;
    }
  };

  // Handle mouse move event
  window.onmousemove = (event) => {
    if (isMouseDown) {
      if (imageTrackElement?.dataset.mouseDownAt === "0") return;

      const mouseDelta =
        parseFloat(imageTrackElement?.dataset?.mouseDownAt) - event.clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained =
        parseFloat(imageTrackElement.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      // Update the data attributes
      imageTrackElement.dataset.percentage = nextPercentage;

      // Update the transform style
      imageTrackElement.style.transform = `translate(${nextPercentage}%, 0%)`;

      // Update object position for images
      for (const image of imageTrackElement.getElementsByClassName("image")) {
        image.style.objectPosition = `${nextPercentage + 100}% 50%`;
      }
    }
  };

  return (
    <ul
      id="image_track"
      data-mouse-down-at="0"
      data-prev-percentage="0"
      data-percentage="0"
      className={`image_track `}
    >
      {props.images.map((image, index) => (
        <ListRenderer key={index}>
          <img
            className={`image image brightness-[.9] border-[1px] ${props.color.border}`}
            src={image}
            alt="error loading"
          />
        </ListRenderer>
      ))}
    </ul>
  );
};

export default ImageSlideshow;
