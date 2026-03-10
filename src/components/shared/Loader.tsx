function Loader({ size }: { size: number }) {
	return <span style={{ width: size, height: size, display: "inline-block" }} className={`loader`} />;
}

export default Loader;
