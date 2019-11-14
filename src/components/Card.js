import React from "react";
import { animated, interpolate } from "react-spring";

export default ({ profile, bind, x, y, rot, scale, i, trans }) => {
  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
        ...styles.cardContainer
      }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${profile.profile_picture})`,
          ...styles.card
        }}
      >
        <div
          style={{
            backgroundImage: `url(${profile.owner_picture})`,
            ...styles.ownerPhoto
          }}
        />
      </animated.div>
    </animated.div>
  );
};

const styles = {
  cardContainer: {
    position: "absolute",
    height: "90vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    position: "relative",
    backgroundColor: "white",
    backgroundSize: "auto 85%",
    width: "45vh",
    height: "85vh",
    maxWidth: "300px",
    maxHeight: "570px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    borderRadius: "10px",
    boxShadow:
      "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)"
  },
  ownerPhoto: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
};
