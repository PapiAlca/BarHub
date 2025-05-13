package com.daw2.barhub.auth.services;

import com.daw2.barhub.auth.models.User;
import java.util.List;

public interface UserService {
    List<User> findAll();
    User save(User user);
    User findById(Long id);
    void delete(Long id);
}