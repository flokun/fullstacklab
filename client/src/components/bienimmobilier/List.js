import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {list, reset} from '../../actions/bienimmobilier/list';
import Navbar from "../navbar";
import './css/list.css';

class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
      decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
        decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
    return (
      <div>
        <Navbar/>

        <div className="container-fluid">
          <br/>
          <h1 className="text-center">Liste des biens immobiliers</h1>
          <br/>
          {this.props.loading && (
            <div className="alert alert-info">Chargement...</div>
          )}
          {this.props.deletedItem && (
            <div className="alert alert-success">
              {this.props.deletedItem['@id']} supprimé.
            </div>
          )}
          {this.props.error && (
            <div className="alert alert-danger">{this.props.error}</div>
          )}

          <div className="widget-main no-padding">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-condensed table-hover">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>N° de disposition</th>
                  <th>Date de mutation</th>
                  <th>Nature de la mutation</th>
                  <th>Valeur foncière</th>
                  <th>Code postal</th>
                  <th>Commune</th>
                  <th>Code département</th>
                  <th>Code commune</th>
                  <th>Surface réelle bâti</th>
                  <th>Surface terrain</th>
                  <th colSpan={1}/>
                </tr>
                </thead>
                <tbody>
                {this.props.retrieved &&
                this.props.retrieved['hydra:member'].map(item => (
                  <tr key={item['@id']}>
                    <th scope="row">
                      <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                        {item.id}
                      </Link>
                    </th>
                    <td>{item['numDispo']}</td>
                    <td>{item['dateMutation']}</td>
                    <td>{item['natureMutation']}</td>
                    <td>{item['valeurFonciere']}</td>
                    <td>{item['codePostal']}</td>
                    <td>{item['commune']}</td>
                    <td>{item['codeDepartement']}</td>
                    <td>{item['codeCommune']}</td>
                    <td>{item['surfaceReelleBati']}</td>
                    <td>{item['surfaceTerrain']}</td>
                    <td>
                      <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                        <span className="fa fa-search fa-3x" aria-hidden="true"/>
                        <span className="sr-only">Show</span>
                      </Link>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          {this.pagination()}
        </div>
      </div>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <div className="centrer">
        <nav aria-label="Page navigation">
          <Link
            to="."
            className={`btn btn-primary btn-arrow-left${previous ? '' : ' disabled'}`}
          >Premier
          </Link>
          <Link
            to={
              !previous || previous === first ? '.' : encodeURIComponent(previous)
            }
            className={`btn btn-info btn-arrow-left${previous ? '' : ' disabled'}`}
          >Précédent
          </Link>
          <button type="button" className="btn btn-link"><a href={"https://localhost/bien_immobiliers/"}>Retour en Haut</a></button>
          <Link
            to={next ? encodeURIComponent(next) : '#'}
            className={`btn btn-info btn-arrow-right${next ? '' : ' disabled'}`}
          >Suivant
          </Link>
          <Link
            to={last ? encodeURIComponent(last) : '#'}
            className={`btn btn-primary btn-arrow-right${next ? '' : ' disabled'}`}
          >Dernier
          </Link>
        </nav>
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
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}

const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.bienimmobilier.list;
  return {retrieved, loading, error, eventSource, deletedItem};
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
