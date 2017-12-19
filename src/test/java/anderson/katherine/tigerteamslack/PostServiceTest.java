package anderson.katherine.tigerteamslack;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.mockito.BDDMockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest(PostService.class)
public class PostServiceTest {

    @Autowired
    private PostService postService;

    @MockBean
    private PostRepository postRepository;

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
        given(postRepository.findAll()).willReturn((Iterable) allPosts);

        Assert.assertEquals(allPosts, postService.getAllPosts());
    }

    @Test
    public void getPostTest_true() throws Exception {
        given(postRepository.findOne((long) 1)).willReturn(post1);

        Assert.assertEquals(post1, postService.getPost(1));
    }

    @Test
    public void getPostTest_false() throws Exception {
        given(postRepository.findOne((long) 6)).willReturn(null);

        Assert.assertEquals(null, postService.getPost(1));
    }

    @Test
    public void getPostsByUserTest_true() throws Exception {
        given(postRepository.findPostsByUserId(7)).willReturn((Iterable) Arrays.asList(post1, post2, post3));

        Assert.assertEquals(Arrays.asList(post1, post2, post3), postService.getAllPostsByUserId(7));
    }

    @Test
    public void getPostsByUserTest_false() throws Exception {
        given(postRepository.findPostsByUserId(90)).willReturn(null);

        Assert.assertEquals(null, postService.getAllPostsByUserId(90));
    }

    @Test
    public void getPostsBySearchTest_true() throws Exception {
        given(postRepository.findPostsByContentContaining("ir")).willReturn((Iterable) Arrays.asList(post1, post3));

        Assert.assertEquals(Arrays.asList(post1, post3), postService.getPostsContaining("ir"));
    }

    @Test
    public void getPostsBySearchTest_false() throws Exception {
        given(postRepository.findPostsByContentContaining("zz")).willReturn(null);

        Assert.assertEquals(null, postService.getPostsContaining("zz"));
    }

    @Test
    public void addPostTest_true() throws Exception {
        Assert.assertTrue(postService.addPost(post1));
    }

    @Test
    public void addPostTest_false() throws Exception {
        Assert.assertFalse(postService.addPost(null));
    }

    @Test
    public void updatePostTest_true() throws Exception {
        given(postService.getPost(1)).willReturn(post1);

        Assert.assertTrue(postService.updatePost(1, post2));
    }

    @Test
    public void updatePostTest_false() throws Exception {
        given(postService.getPost(6)).willReturn(null);

        Assert.assertFalse(postService.updatePost(6, post2));
    }

    @Test
    public void deletePostTest_true() throws Exception {
        given(postService.getPost(1)).willReturn(post1);

        Assert.assertTrue(postService.deletePost(1));
    }

    @Test
    public void deletePostTest_false() throws Exception {
        given(postService.getPost(6)).willReturn(null);

        Assert.assertFalse(postService.deletePost(6));
    }
}
