/**
 * Libraries
 */
import React, { Component } from "react";
import { Result, Spin } from "antd";
import { getEnv } from "mobx-state-tree";
import { observer, Provider } from "mobx-react";
//import Tour from "reactour";
// import JoyRide from 'react-joyride';
import MyTour from "../MyTour/MyTour";
/**
 * Core
 */
import Tree from "../../core/Tree";

/**
 * Components
 */
import Completions from "../Completions/Completions";
import Controls from "../Controls/Controls";
import Debug from "../Debug";
import Panel from "../Panel/Panel";
import Predictions from "../Predictions/Predictions";
import Segment from "../Segment/Segment";
import Settings from "../Settings/Settings";
import SideColumn from "../SideColumn/SideColumn";
import { RelationsOverlay } from "../RelationsOverlay/RelationsOverlay";
import LeaderBoards from "../LeaderBoard/LeaderBoard";
import Messages from "../Message/Message";
/**
 * Tags
 */
import * as ObjectTags from "../../tags/object"; // eslint-disable-line no-unused-vars
import * as ControlTags from "../../tags/control"; // eslint-disable-line no-unused-vars
import * as VisualTags from "../../tags/visual"; // eslint-disable-line no-unused-vars

/**
 * Styles
 */
import styles from "./App.module.scss";
import { TreeValidation } from "../TreeValidation/TreeValidation";
import { guidGenerator } from "../../utils/unique";
import Grid from "./Grid";

/**
 * App
 */
class App extends Component {
  renderSuccess() {
    return <Result status="success" title={getEnv(this.props.store).messages.DONE} />;
  }

  renderNoCompletion() {
    return <Result status="success" title={getEnv(this.props.store).messages.NO_COMP_LEFT} />;
  }

  renderNothingToLabel() {
    return <Result status="success" title={getEnv(this.props.store).messages.NO_NEXT_TASK} />;
  }

  renderNoAccess() {
    return <Result status="warning" title={getEnv(this.props.store).messages.NO_ACCESS} />;
  }

  renderConfigValidationException() {
    return (
      <Segment>
        <TreeValidation errors={this.props.store.completionStore.validation} />
      </Segment>
    );
  }

  renderLoader() {
    return <Result icon={<Spin size="large" />} />;
  }

  _renderAll(obj) {
    if (obj.length === 1) return <Segment completion={obj[0]}>{[Tree.renderItem(obj[0].root)]}</Segment>;

    return (
      <div className="ls-renderall">
        {obj.map(c => (
          <div className="ls-fade">
            <Segment completion={c}>{[Tree.renderItem(c.root)]}</Segment>
          </div>
        ))}
      </div>
    );
  }

  _renderUI(root, store, cs, settings) {
    return (
      <>
        {!cs.viewingAllCompletions && !cs.viewingAllPredictions && (
          <Segment completion={cs.selected} className={settings.bottomSidePanel ? "" : styles.segment + " ls-segment"}>
            {store.showingDescription && store.description && (
              <Segment className={styles.ls_description_bgcolor}>
                <div dangerouslySetInnerHTML={{ __html: store.description }} />
              </Segment>
            )}
            <div style={{ position: "relative" }}>
              {Tree.renderItem(root)}
              {this.renderRelations(cs.selected)}
            </div>
            {store.hasInterface("controls") && <Controls item={cs.selected} />}
          </Segment>
        )}
        {cs.viewingAllCompletions && this.renderAllCompletions()}
        {cs.viewingAllPredictions && this.renderAllPredictions()}
      </>
    );
  }

  renderAllCompletions() {
    const cs = this.props.store.completionStore;
    return <Grid store={cs} completions={[...cs.completions, ...cs.predictions]} root={cs.root} />;
  }

  renderAllPredictions() {
    return this._renderAll(this.props.store.completionStore.predictions);
  }

  renderRelations(selectedStore) {
    const store = selectedStore.relationStore;
    return <RelationsOverlay key={guidGenerator()} store={store} />;
  }

  render() {
    const self = this;
    const { store } = self.props;
    const cs = store.completionStore;
    const root = cs.selected && cs.selected.root;
    const { settings } = store;

    if (store.isLoading) return self.renderLoader();

    if (store.noTask) return self.renderNothingToLabel();

    if (store.noAccess) return self.renderNoAccess();

    if (store.labeledSuccess) return self.renderSuccess();

    if (!root) return self.renderNoCompletion();

    const stEditor = settings.fullscreen ? styles.editorfs : styles.editor;
    const stCommon = settings.bottomSidePanel ? styles.commonbsp : styles.common;
    const stMenu = settings.bottomSidePanel ? styles.menubsp : styles.menu;

    return (
      <div className={stEditor + " ls-editor"}>
        <Settings store={store} />
        <Provider store={store}>
          <div>
            {store.hasInterface("panel") && <Panel store={store} />}

            {/* {store.showingDescription &&  store.description &&(
                  <Segment>
                    <div dangerouslySetInnerHTML={{ __html: store.description }} />
                  </Segment>
              )} */}

            {/* <div className={styles.pins}> */}
            {/*   <div style={{ width: "100%", marginRight: "20px" }}><PushpinOutlined /></div> */}
            {/*   <div className={styles.pinsright}><PushpinOutlined /></div> */}
            {/* </div> */}

            <div className={stCommon + " ls-common"}>
              {cs.validation === null
                ? this._renderUI(root, store, cs, settings)
                : this.renderConfigValidationException()}
              <div className={stMenu + " ls-menu"}>
                {store.hasInterface("messages") && <Messages store={store} />}
                {store.hasInterface("completions:menu") && store.settings.showCompletionsPanel && (
                  <Completions store={store} />
                )}
                {store.hasInterface("predictions:menu") && store.settings.showPredictionsPanel && (
                  <Predictions store={store} />
                )}
                {store.hasInterface("side-column") && !cs.viewingAllCompletions && !cs.viewingAllPredictions && (
                  <SideColumn store={store} />
                )}
                {store.hasInterface("leaderboad") && <LeaderBoards store={store} />}
              </div>
            </div>
          </div>
        </Provider>
        {store.hasInterface("debug") && <Debug store={store} />}
        <MyTour />
        {/* <MyTour />
        <JoyRide steps={TOUR_STEPS} continuous={true}/> */}
        {/* <Tour
        steps={steps}
        isOpen='false'//{isTourOpen}
        //onRequestClose={}//onRequestClose={() => setIsTourOpen(false)}
      /> */}
      </div>
    );
  }
}

export default observer(App);
