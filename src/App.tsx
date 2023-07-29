import styled from '@emotion/styled';
import {Header} from 'components/Header';
import {BlogPost} from 'components/BlogPost';
import { useEffect, useState } from 'react';
import mockPosts from 'mock/post.json';
import {Button} from 'components/Button'

const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background-color: #eeeeee;
overflow: scorll;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  bottom: 40px
`;

const Form = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgd(0 0 0 / 75%);
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  jutify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.div`
  font-size: 1.2rem;
`;

const Input = styled.input`
  font-size: 1.2rem;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

interface Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;
}



function App() {
  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  useEffect(()=> {
    setTimeout(()=> {
      setPosts(mockPosts);
    }, 1000);
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json()) //서버로부터 전달 받은 데이터를 JSON으로 파싱
    .then((json) => setPosts(json)) //JSON으로 파싱한 데이터를 전달받아 State에 저장
    .catch((error)=> {
      //에러처리
      console.log(error);
    })
  }, []);

  return (
    <Container>
      <Header/>
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body}/>
      ))}
      <ButtonContainer>
        <Button label="등록" />
      </ButtonContainer>
    
    <Form>
      <Background/>
      <Contents>
        <Title>블로그 글 등록</Title>
          <InputGroup>
          <Label>Title:</Label>
          <Input/>
        </InputGroup>
        <InputGroup>
          <Label>Body:</Label>
        <Input/>
        </InputGroup>
        <Actions>
            <Button label="등록하기"/>
            <Button label='닫기' color='#304FFE'/>
        </Actions>
      </Contents>
    </Form>
    </Container>
  );
}

export default App;
