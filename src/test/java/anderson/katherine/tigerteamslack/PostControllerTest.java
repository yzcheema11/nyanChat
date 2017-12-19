package anderson.katherine.tigerteamslack;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.any;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(PostController.class)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    Post post1;
    Post post2;
    Post post3;
    Post post4;
    Post post5;
    List<Post> allPosts;

    @Before
    public void initialize() {
        post1 = new Post("First message", 1, 7, "sample timestamp");
        post2 = new Post("Second message", 1, 7, "sample timestamp");
        post3 = new Post("Third message", 1, 7, "sample timestamp");
        post4 = new Post("Fourth message", 1, 4, "sample timestamp");
        post5 = new Post("Fifth message", 1, 4, "sample timestamp");

        allPosts = new ArrayList<>();
        allPosts.add(post1);
        allPosts.add(post2);
        allPosts.add(post3);
        allPosts.add(post4);
        allPosts.add(post5);
    }

    @Test
    public void getAllPostsTest() throws Exception {
        given(postService.getAllPosts()).willReturn(allPosts);

        mockMvc.perform(get("/api/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(5)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value(post1.getContent()));
    }

    @Test
    public void getPostTest_true() throws Exception {
        given(postService.getPost(1)).willReturn(post1);

        mockMvc.perform(get("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value(post1.getContent()));
    }

    @Test
    public void getPostTest_false() throws Exception {
        given(postService.getPost(6)).willReturn(null);

        mockMvc.perform(get("/api/posts/6")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").doesNotExist());
    }

    @Test
    public void getPostsByUserTest_true() throws Exception {
        given(postService.getAllPostsByUserId(7)).willReturn(Arrays.asList(post1, post2, post3));

        mockMvc.perform(get("/api/posts/byUser/7")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value(post1.getContent()));
    }

    @Test
    public void getPostsByUserTest_false() throws Exception {
        given(postService.getAllPostsByUserId(90)).willReturn(null);

        mockMvc.perform(get("/api/posts/90")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").doesNotExist());
    }

    @Test
    public void getPostsBySearchTest_true() throws Exception {
        given(postService.getPostsContaining("ir")).willReturn(Arrays.asList(post1, post3));

        mockMvc.perform(get("/api/posts/bySearch/ir")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value(post1.getContent()));
    }

    @Test
    public void getPostsBySearchTest_false() throws Exception {
        given(postService.getPostsContaining("zz")).willReturn(null);

        mockMvc.perform(get("/api/posts/bySearch/zz")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").doesNotExist());
    }

    @Test
    public void addPostTest_true() throws Exception {
        String postJson = "{\"content\":\"First message\",\"threadId\":\"1\",\"userId\":\"7\",\"timestamp\":\"sample timestamp\"}";
        given(postService.addPost(Matchers.any())).willReturn(true);

        mockMvc.perform(post("/api/posts/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void addPostTest_false() throws Exception {
        String postJson = "{\"content\":null,\"threadId\":\"1\",\"userId\":\"7\",\"timestamp\":\"sample timestamp\"}";
        given(postService.addPost(Matchers.any())).willReturn(false);

        mockMvc.perform(post("/api/posts/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void updatePostTest_true() throws Exception {
        String postJson = "{\"content\":\"Updated post\",\"threadId\":\"1\",\"userId\":\"7\",\"timestamp\":\"sample timestamp\"}";
        given(postService.updatePost(Matchers.anyLong(), Matchers.any())).willReturn(true);
//        when(postService.updatePost(Matchers.anyLong(), Matchers.any())).thenReturn(true);

        mockMvc.perform(put("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isOk());
    }

    @Test
    public void updatePostTest_false() throws Exception {
        String postJson = "{\"content\":null,\"threadId\":\"1\",\"userId\":\"7\",\"timestamp\":\"sample timestamp\"}";
        given(postService.updatePost(Matchers.anyLong(), Matchers.any())).willReturn(false);

        mockMvc.perform(put("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void deletePostTest_true() throws Exception {
        given(postService.deletePost(Matchers.anyLong())).willReturn(true);

        mockMvc.perform(delete("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void deletePostTest_false() throws Exception {
        given(postService.deletePost(Matchers.anyLong())).willReturn(false);

        mockMvc.perform(delete("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
