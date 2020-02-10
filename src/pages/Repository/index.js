import React, { Component } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueFilters,
  IssueList,
  IssuePaginator,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate(_, prevState) {
    const { filter, page } = this.state;
    if (prevState.filter !== filter || prevState.page !== page) {
      this.loadIssues();
    }
  }

  handleFilter = filter => {
    this.setState({ filter });
  };

  handlePriorPage() {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  }

  handleNextPage() {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  }

  async loadIssues() {
    const { match } = this.props;
    const { filter, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  }

  render() {
    const { repository, issues, loading, filter, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilters filter={filter}>
          <button
            type="button"
            name="all"
            onClick={() => this.handleFilter('all')}
          >
            Todos
          </button>
          <button
            type="button"
            name="open"
            onClick={() => this.handleFilter('open')}
          >
            Abertos
          </button>
          <button
            type="button"
            name="closed"
            onClick={() => this.handleFilter('closed')}
          >
            Fechados
          </button>
        </IssueFilters>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.name)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <IssuePaginator>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePriorPage()}
          >
            <FaArrowLeft color="#fff" size={14} />
          </button>
          {page}
          <button type="button" onClick={() => this.handleNextPage()}>
            <FaArrowRight color="#fff" size={14} />
          </button>
        </IssuePaginator>
      </Container>
    );
  }
}
