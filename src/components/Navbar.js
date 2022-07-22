import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

function Navbar() {
  return (
    <Container style={{ marginTop: '1em' }}>
      <Menu secondary>
        <Menu.Item as="a" header>
          PayStream
        </Menu.Item>
      </Menu>
    </Container>
  );
}

export default Navbar;
