<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class WeatherType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lon')
            ->add('lat')
            ->add('dt')
            ->add('name')
            ->add('country')
            ->add('main')
            ->add('description')
            ->add('temperature')
            ->add('pressure')
            ->add('humidity')
            ->add('wind_speed')
            ->add('wind_deg')
            ->add('clouds')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'App\Entity\Weather',
        ]);
    }
}
