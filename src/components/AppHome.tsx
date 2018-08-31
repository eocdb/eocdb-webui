import * as React from "react";

interface AppHomeProps {

}


export class AppHome extends React.PureComponent<AppHomeProps>{
    constructor(props: AppHomeProps){
        super(props);
    }

    render(){
        return(
          <div>
              Hello
          </div>
        );
    }
}