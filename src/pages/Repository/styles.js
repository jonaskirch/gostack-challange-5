import styled from 'styled-components';

export const IssueFilters = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-top: 1px solid #eee;
  margin-top: 30px;
  padding: 5px 0;

  button {
    color: #fff;
    height: 30px;
    width: 100px;
    background: #666;
    border: 0;
    padding: 0 15px;
    margin: 5px;
    border-radius: 4px;
  }

  button[name=${props => props.filter}] {
    background: #7159c1;
  }
`;

export const IssuePaginator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;

  button {
    color: #fff;
    height: 30px;
    background: #666;
    border: 0;
    padding: 0 15px;
    margin: 10px;
    border-radius: 4px;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const Loading = styled.div`
  background-color: #7159c1;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }

        &:hover {
          color: #7159c1;
        }
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
