import React, { Component } from "react";
import { Card } from "antd";
import { observer } from "mobx-react";

import styles from "../Completions/Completions.module.scss";

class LeaderBoards extends Component {
  render() {
    const { store } = this.props;
    // const { userRanks } = store.userRanks;

    let title = (
      <div className={styles.title + " " + styles.titlespace}>
        <h3>LeaderBoard</h3>
      </div>
    );

    return (
      <Card title={title} size="small" bodyStyle={{ padding: "0", backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "50%", textAlign: "center" }}>Rank</th>
              <th style={{ width: "50%", textAlign: "center" }}>User</th>
            </tr>
          </thead>
          <tbody>
            {store.userRanks && store.userRanks.length ? (
              store.userRanks.map(p => (
                <tr style={{ textAlign: "center" }}>
                  <td style={{ fontWeight: "bold" }}>{p.rank}</td>
                  <td>{p.UserName}</td>
                </tr>
              ))
            ) : (
              <tr style={{ padding: "0 12px" }}>
                <td>No User Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    );
  }
}

export default observer(LeaderBoards);
