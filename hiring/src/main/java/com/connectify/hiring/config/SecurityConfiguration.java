import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.connectify.hiring.services.UserDetailsServiceIMPL;



@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final UserDetailsServiceIMPL userDetailsServiceIMPL;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(UserDetailsServiceIMPL userDetailsServiceIMPL, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsServiceIMPL = userDetailsServiceIMPL;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers("/job-post/**", "/candidate/**").hasAnyAuthority("MANAGER", "BUSINESS_OWNER")
                                .anyRequest()
                                .authenticated()
                )
                .userDetailsService(userDetailsServiceIMPL)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}