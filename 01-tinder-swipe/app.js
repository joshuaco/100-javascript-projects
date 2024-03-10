const DECISION_THRESHOLD = 80;

// Saber si la card se está animando para evitar los eventos.
let isAnimating = false;

// Distancia que la card se esta arrastrando
let deltaX = 0;

function startDrag(e) {
  if (isAnimating) return;

  // Get the first closest article element
  const actualCard = e.target.closest("article");

  // checks if the element exists
  if (!actualCard) return;

  // Get initial position for mouse or fingers.
  const startX = e.pageX ?? e.touches[0].pageX;

  // Listen the mouse and touch movements
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onEnd);

  document.addEventListener("touchmove", onMove, { passive: true });
  document.addEventListener("touchend", onEnd, { passive: true });

  function onMove(e) {
    // current position of mouse or finger
    const currentX = e.pageX ?? e.touches[0].pageX;
    // distance between the initial and current position
    deltaX = currentX - startX;
    // No hay distancia recorrida
    if (deltaX === 0) return;
    // change the flag to indicate that is animating
    isAnimating = true;
    // calculate the rotation of the card using the distance
    const deg = deltaX / 14;
    // apply the transformation to the card
    actualCard.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;

    // Change opacity of the choiced decision
    const opacity = Math.abs(deltaX) / 100;
    const isRight = deltaX > 0;

    const choicedEl = isRight
      ? actualCard.querySelector(".choice.like")
      : actualCard.querySelector(".choice.nope");

    choicedEl.style.opacity = opacity;
  }

  function onEnd(e) {
    // remove the event listeners
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);

    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);

    // Check if the card was swiped enough
    const hasDecided = Math.abs(deltaX) >= DECISION_THRESHOLD;

    if (hasDecided) {
      const goRight = deltaX >= 0;
      const goLeft = !goRight;

      // add class according to decision
      actualCard.classList.add(goRight ? "go-right" : "go-left");

      // remove animation class
      actualCard.addEventListener(
        "transitionend",
        () => {
          actualCard.remove();
        },
        // once: true se suscribe una vez al evento
        { once: true }
      );
    } else {
      actualCard.classList.add("reset");
      actualCard.classList.remove("go-right", "go-left");
      actualCard
        .querySelectorAll(".choice")
        .forEach((el) => (el.style.opacity = 0));
    }

    // reset variables
    actualCard.addEventListener(
      "transitionend",
      () => {
        actualCard.removeAttribute("style");
        actualCard.classList.remove("reset");

        deltaX = 0;
        isAnimating = false;
      },
      { once: true }
    );
  }
}

// Listen when user clicks or touch the card
document.addEventListener("mousedown", startDrag);

// Touch events have poor perfomance that's why the passive: true
document.addEventListener("touchstart", startDrag, { passive: true });
