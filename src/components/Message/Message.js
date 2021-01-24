import React, { Component } from "react";
import { Card } from "antd";
import { observer } from "mobx-react";

import styles from "../Completions/Completions.module.scss";

class Messages extends Component {
  render() {
    const { store } = this.props;

    let title = (
      <div className={styles.title + " " + styles.titlespace}>
        <h3>Answer Response</h3>
      </div>
    );

    return (
      <Card title={title} size="small" bodyStyle={{ padding: "0" }}>
        {store.answerResponse && store.answerResponse.type === 1 ? (
          <div style={{ fontWeight: "bold", padding: "1 0", background: "rgba(4, 167, 45)" }}>
            {store.answerResponse.message}
          </div>
        ) : store.answerResponse && store.answerResponse.type === 2 ? (
          <div style={{ fontWeight: "bold", padding: "1 0", background: "rgba(255,77,79)" }}>
            {store.answerResponse.message}
          </div>
        ) : store.answerResponse ? (
          <div style={{ fontWeight: "bold", padding: "1 0", background: "rgba(176,220,255)" }}>
            {store.answerResponse.message}
          </div>
        ) : (
          <div></div>
        )}

        {/* <List>
          {predictions && predictions.length ? (
            predictions.map(p => <Prediction key={p.id} item={p} store={store} />)
          ) : (
            <List.Item>
              <div style={{ padding: "0 12px" }}>No predictions</div>
            </List.Item>
          )}
        </List> */}
      </Card>
    );
  }
}

export default observer(Messages);
