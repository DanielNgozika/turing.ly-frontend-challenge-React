import React, { Component } from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/attribute.module.css";

//actions
import { addToCart, clickBackDrop } from "../../../actions/general/index";

class AttributeInput extends Component {
	state = {
		selectedColor: null,
		selectedSize: null
	};

	selectColor = color => this.setState({ selectedColor: color });
	selectSize = size => this.setState({ selectedSize: size });

	submit = () => {
		const { selectedColor, selectedSize } = this.state;
		const attributes = `${selectedColor}, ${selectedSize}`;
		const { addToCart, cartId, productId, clickBackDrop } = this.props;
		addToCart(cartId, productId, attributes);
		clickBackDrop();
	};
	render() {
		const { selectedColor, selectedSize } = this.state;
		return (
			<>
				<div className={styles.selected}>
					{selectedColor ? <span>{selectedColor}</span> : null}
					{selectedSize ? <span>, {selectedSize}</span> : null}
				</div>
				<p className={styles.p}>Pick a color:</p>
				<div className={styles.colors}>
					<span
						className={styles.blue}
						onClick={() => this.selectColor("blue")}
					/>
					<span
						className={styles.red}
						onClick={() => this.selectColor("red")}
					/>
					<span
						className={styles.yellow}
						onClick={() => this.selectColor("yellow")}
					/>
					<span
						className={styles.green}
						onClick={() => this.selectColor("green")}
					/>
					<span
						className={styles.black}
						onClick={() => this.selectColor("black")}
					/>
				</div>
				<p className={styles.p2}>Pick a size:</p>
				<div className={styles.sizes}>
					<button onClick={() => this.selectSize("S")}>S</button>
					<button onClick={() => this.selectSize("M")}>M</button>
					<button onClick={() => this.selectSize("L")}>L</button>
					<button onClick={() => this.selectSize("XL")}>XL</button>
				</div>
				<button className={styles.submit} onClick={this.submit}>
					Done
				</button>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		productId: state.general.productIdAttrModalOpen,
		cartId: state.general.cartId
	};
}

const mapDispatchToProps = dispatch => ({
	addToCart: (...args) => addToCart(dispatch, ...args),
	clickBackDrop: () => dispatch(clickBackDrop())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AttributeInput);
