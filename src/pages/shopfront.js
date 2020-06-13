import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

//Components
import StaticProfile from '../components/profile/StaticProfile';


//Redux
import { connect } from 'react-redux';
import { getShopData } from '../redux/actions/dataActions';


class shopfront extends Component {
    state = {
        profile: null,
        userNameParam: null,
        productIdParam: null
    }
    componentDidMount(){
        const productId = this.props.match.params.productId;
        if (productId) this.setState({ productIdParam: productId });

        const userName = this.props.match.params.userName;
        if (userName) this.setState({ userNameParam: userName });

        this.props.getShopData(userName);
        axios.get(`/user/${userName}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
     }
    render() {
        return (
            <div>
            {this.state.profile === null ?(<p>loading profile..</p>):(<StaticProfile profile={this.state.profile} productIdParam={this.state.productIdParam}/>)}
            </div>
        )
    }
}

shopfront.propTypes = {
    getShopData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
});

export default connect(mapStateToProps,{ getShopData })(shopfront);
