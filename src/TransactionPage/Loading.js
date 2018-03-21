import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { CardText } from 'material-ui/Card';

const styles = {
    loadingStyle: {
      marginTop: '5em',
      position: 'relative'
    },
    refresh: {
      backgroundColor: 'inherit',
      marginLeft: '50%'
    },
  }

const Loading = () => (
    <CardText style={styles.loadingStyle}>
        <RefreshIndicator
            size={40}
            left={-20}
            top={10}
            status={'loading'}
            style={styles.refresh}
        />
    </CardText>
);

export default Loading;