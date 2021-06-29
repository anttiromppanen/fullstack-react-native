import React from 'react';
import { View, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import { faUser, faPen, faStar, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

import theme from '../theme';

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  reviewText: '',
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner\'s name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .string()
    .required('Rating is a required number between 0 and 100'),
  review: yup
    .string()
});

const backgroundImage = { uri: 'https://images.pexels.com/photos/3205479/pexels-photo-3205479.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' };

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
      <View style={theme.formStyle}>
        <Text style={theme.formHeadingText} fontSize="heading">Create a review</Text>
        <FormikTextInput
          style={theme.formTextInput}
          name="repositoryOwner"
          placeholder="Repository owner name"
          icon={faUser}
        />
        <FormikTextInput
          style={theme.formTextInput}
          name="repositoryName"
          placeholder="Repository name" 
          icon={faPen}
        />
        <FormikTextInput
          style={theme.formTextInput}
          name="rating"
          placeholder="Rating between 0 and 100" 
          icon={faStar}
        />
        <FormikTextInput
          style={theme.formTextInput}
          name="reviewText"
          placeholder="Write a review"
          icon={faAlignLeft}
          multiline
        />
        <Pressable style={theme.formSubmitButton} onPress={onSubmit}>
          <Text style={theme.formSubmitButtonText} fontWeight="bold" fontSize="subheading">Create a review</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, reviewText } = values;
    const rating = parseInt(values.rating);
    
    try {
      const result = await createReview({ repositoryOwner, repositoryName, rating, reviewText });
      history.push(`/repository/${result.createReview.repositoryId}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
     {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;