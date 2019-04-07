import React, { Component } from 'react';
import { connect } from 'react-redux';

//styles
import styles from '../CSS/cart_counter.module.css';

class CartCounter extends Component {
	render() {
		return <div className={styles.div} >
			<div className={styles.counter}>{this.props.itemsCount}</div>
			<i className='fas fa-shopping-basket'></i>
		</div>
	}
}

function mapstateToProps(state) {
	return {
		itemsCount: state.general.cartItemCount
	}
}

export default connect(mapstateToProps, null)(CartCounter);