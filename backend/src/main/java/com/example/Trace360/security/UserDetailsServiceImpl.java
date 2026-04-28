package com.example.Trace360.security;

import com.example.Trace360.entity.User;
import com.example.Trace360.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with username: " + username));

        // Spring Security expects roles prefixed with ROLE_
        // e.g. stored as "ADMIN" → granted authority "ROLE_ADMIN"
        String roleWithPrefix = user.getRole().startsWith("ROLE_")
                ? user.getRole()
                : "ROLE_" + user.getRole();

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(roleWithPrefix))
        );
    }
}
