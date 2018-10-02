import * as React from 'react';
import { render } from "enzyme";

class Foo extends React.PureComponent {
    render(){
      return (
          <div className="in-foo" />
      );
    };
}

function Bar() {
    return (
        <div className="in-bar">
            <Foo />
        </div>
    );
}

const wrapper = render(<Bar />);

describe("test React unit testing", () => {
    it('find', ()=> {
        expect(wrapper.find('.in-foo').length).toEqual(1);
    });
});
