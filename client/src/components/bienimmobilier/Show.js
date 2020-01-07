import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/bienimmobilier/show';
import './css/list.css';

class Show extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".."/>;

    const item = this.props.retrieved;

    return (
      <div className="centrer">
        <h1>Nom de l'objet : {item && item['@id']}</h1>
        <br/>
        {this.props.loading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true"/>{' '}
          </div>
        )}

        {item && (
          <table className="table table-striped table-hover" align="center">
            <thead>
            <tr>
              <th>Champ</th>
              <th>Valeur</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">numDispo</th>
              <td>{item['numDispo']}</td>
            </tr>
            <tr>
              <th scope="row">dateMutation</th>
              <td>{item['dateMutation']}</td>
            </tr>
            <tr>
              <th scope="row">natureMutation</th>
              <td>{item['natureMutation']}</td>
            </tr>
            <tr>
              <th scope="row">valeurFonciere</th>
              <td>{item['valeurFonciere']}</td>
            </tr>
            <tr>
              <th scope="row">codePostal</th>
              <td>{item['codePostal']}</td>
            </tr>
            <tr>
              <th scope="row">commune</th>
              <td>{item['commune']}</td>
            </tr>
            <tr>
              <th scope="row">codeDepartement</th>
              <td>{item['codeDepartement']}</td>
            </tr>
            <tr>
              <th scope="row">codeCommune</th>
              <td>{item['codeCommune']}</td>
            </tr>
            <tr>
              <th scope="row">surfaceReelleBati</th>
              <td>{item['surfaceReelleBati']}</td>
            </tr>
            <tr>
              <th scope="row">surfaceTerrain</th>
              <td>{item['surfaceTerrain']}</td>
            </tr>
            </tbody>
          </table>
        )}
        <Link to=".." className="btn btn-info2">
          Retour à la liste
        </Link>
      </div>
    );
  }

  renderLinks = (type, items) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../../${type}/show/${encodeURIComponent(items)}`}>
        {items}
      </Link>
    );
  };
}

const mapStateToProps = state => ({
  retrieved: state.bienimmobilier.show.retrieved,
  error: state.bienimmobilier.show.error,
  loading: state.bienimmobilier.show.loading,
  eventSource: state.bienimmobilier.show.eventSource,
  deleteError: state.bienimmobilier.del.error,
  deleteLoading: state.bienimmobilier.del.loading,
  deleted: state.bienimmobilier.del.deleted
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);
