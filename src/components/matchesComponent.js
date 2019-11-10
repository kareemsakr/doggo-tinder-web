import React from "react";
// import { useSpring, animated } from "react-spring";
// import { useDrag } from "react-use-gesture";

// export default function PullRelease() {
//   const [props, set] = useSpring(() => ({ x: 0, y: 0 }));

//   // 1. Define the gesture
//   const bind = useDrag(({ down, movement: [mx, my] }) =>
//     set({ x: down ? mx : 0, y: down ? my : 0 })
//   );

//   return (
//     <div style={styles.root}>
//       <animated.div
//         // 2. Bind it to a component
//         {...bind()}
//         style={(props, { ...styles.box })}
//       />
//     </div>
//   );
// }

export default () => {
  return <div>Matches</div>;
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ecede7"
  },
  box: {
    width: "80px",
    height: "80px",
    background: "hotpink",
    borderRadius: "16px"
  }
};
