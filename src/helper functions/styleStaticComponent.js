function styleStaticComponent(SSL) {
  return {
    position: "absolute",
    width: `${SSL.width}px`,
    height: `${SSL.height}px`,
    top: `${SSL.top}px`,
    left: `${SSL.left}px`,
    fontSize: `${SSL.fontSize}px`,
  }
}

export default styleStaticComponent;